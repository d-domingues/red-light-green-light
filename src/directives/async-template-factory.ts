import { TemplateResult } from 'lit';
import { DirectiveResult } from 'lit/directive.js';
import { asyncAppend } from 'lit/directives/async-append.js';

export const useAsyncTemplates = (
  tmplFactory: (...args: any) => DirectiveResult
): [DirectiveResult, (...args: any) => TemplateResult<1>] => {
  const asyncTemplates: any = {
    nextTmpl: null,
    [Symbol.asyncIterator]() {
      return {
        next: async () => ({
          value: await new Promise((r) => (this.nextTmpl = (...args: any) => r(tmplFactory(...args)))),
        }),
      };
    },
  };

  const nextTemplate = (...args: any) => asyncTemplates.nextTmpl(...args);

  return [asyncAppend(asyncTemplates, (t) => t), nextTemplate];
};
