/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

type EndpointRequest<Context = any> = {
  host: string;
  method: 'GET';
  headers: Record<string, string>;
  path: string;
  params: Record<string, string | string[]>;
  query: URLSearchParams;
  body: any;
  rawBody: any;
  context: Context;
};

type EndpointResponse = {
  status?: number;
  headers?: Record<string, string>;
  body?: any;
};