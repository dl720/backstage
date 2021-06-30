/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { UrlReader } from '@backstage/backend-common';
import { CatalogApi } from '@backstage/catalog-client';
import { ScmIntegrations } from '@backstage/integration';
import { Config } from '@backstage/config';
import { TemplaterBuilder } from '../../stages';
import {
  createCatalogRegisterAction,
  createCatalogWriteAction,
} from './catalog';
import { createDebugLogAction } from './debug';
import { createFetchCookiecutterAction, createFetchPlainAction } from './fetch';
import {
  createPublishAzureAction,
  createPublishBitbucketAction,
  createPublishGithubAction,
  createPublishGithubPullRequestAction,
  createPublishGitlabAction,
} from './publish';

export const createBuiltinActions = (options: {
  reader: UrlReader;
  integrations: ScmIntegrations;
  catalogClient: CatalogApi;
  templaters: TemplaterBuilder;
  config: Config;
}) => {
  const { reader, integrations, templaters, catalogClient, config } = options;

  return [
    createFetchPlainAction({
      reader,
      integrations,
    }),
    createFetchCookiecutterAction({
      reader,
      integrations,
      templaters,
    }),
    createPublishGithubAction({
      integrations,
      config,
    }),
    createPublishGithubPullRequestAction({
      integrations,
    }),
    createPublishGitlabAction({
      integrations,
      config,
    }),
    createPublishBitbucketAction({
      integrations,
      config,
    }),
    createPublishAzureAction({
      integrations,
      config,
    }),
    createDebugLogAction(),
    createCatalogRegisterAction({ catalogClient, integrations }),
    createCatalogWriteAction(),
  ];
};
