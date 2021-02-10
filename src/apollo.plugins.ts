import { ForbiddenException } from '@nestjs/common';
import {
  ApolloServerPlugin,
  GraphQLRequestContext,
} from 'apollo-server-plugin-base';
import { Environment } from './env.validation';

const isIntrospectionRequest = <TContext>(
  request: GraphQLRequestContext<TContext>['request'],
) => {
  const REGEX_INTROSPECTION_QUERY = /\b(__schema|__type)\b/;
  return REGEX_INTROSPECTION_QUERY.test(request.query);
};

export const checkIntrospectionPlugin: ApolloServerPlugin = {
  requestDidStart(context: GraphQLRequestContext<any>) {
    const { request } = context;
    if (
      process.env.NODE_ENV === Environment.Production &&
      isIntrospectionRequest(request) &&
      request.http.headers.get('X-Introspection-Key') !==
        process.env.INTROSPECTION_KEY
    ) {
      throw new ForbiddenException(
        'You are not authorized to perform this request.',
      );
    }
  },
};
