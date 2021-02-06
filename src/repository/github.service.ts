import { RepositoryService } from './repository.service';
import { Repository } from './entities/repository.entity';
import { InvalidUrlException } from './exceptions/invalid-url.exception';
import { RepositoryVersionService } from './../repository-version/repository-version.service';
import { CreateRepositoryVersionInput } from './../repository-version/dto/create-repository-version.input';
import { HttpService, Injectable } from '@nestjs/common';
import { isAfter, subMinutes } from 'date-fns';

@Injectable()
export class GithubService {
  constructor(
    private readonly httpService: HttpService,
    private readonly repositoryService: RepositoryService,
    private readonly repositoryVersionService: RepositoryVersionService,
  ) {}

  async getRepositoryReleasesInfo(owner: string, repositoryName: string) {
    try {
      const response = await this.httpService
        .get(
          `https://api.github.com/repos/${owner}/${repositoryName}/releases?per_page=10`,
        )
        .toPromise();

      const versions: Array<CreateRepositoryVersionInput> = response.data.map(
        (data) => ({
          version: data.tag_name,
          url: data.html_url,
          publishedAt: new Date(data.published_at),
          prerelease: data.prerelease,
        }),
      );

      return versions;
    } catch (error) {
      if (error.response.status === 404) {
        throw new InvalidUrlException();
      }

      throw error;
    }
  }

  splitGithubUrl(repositoryUrl: string) {
    repositoryUrl = repositoryUrl.replace(/^https?\:\/\/github.com\//i, '');
    const [owner, repositoryName] = repositoryUrl.split('/');

    if (!owner || !repositoryName) {
      throw new InvalidUrlException();
    }

    return [owner, repositoryName];
  }

  async updateReleaseInfo(
    repository: Repository,
    versions,
    isNew: boolean = false,
  ) {
    // 정보가 이미 있는 레파지토리고, 갱신한지 1분도 되지 않았다면 갱신하지 않음
    if (!isNew && !isAfter(subMinutes(new Date(), 1), new Date(repository.updatedAt))) {
      return;
    }

    await this.repositoryVersionService.removeByRepositoryId(repository.id);

    for (const version of versions) {
      // prisma에서 create도 테이블 동시 접근을 막은건지 Promise.all으로 병렬 처리 하려고 하면 에러가 나서 하나씩 await하게 변경
      await this.repositoryVersionService.create(repository.id, version);
    }

    await this.repositoryService.update(repository.id, {
      updatedAt: new Date(),
    });
  }
}
