/**

Copyright 2019 Forestry.io Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import { EditorView } from 'prosemirror-view'
import { Plugin } from '@tinacms/core'

import { createEditorState } from '../../plugins'
import { buildSchema } from '../../schema'
import { buildTranslator } from './buildTranslator'
import { nodeViews } from '../../node-views'
import { Format } from '../../translator'
import { ImageProps } from '../../types'

export interface Input {
  value: string
  onChange(value: string): void
  onFocus(): void
  onBlur(): void
}

export const buildEditor = (
  input: Input,
  el: HTMLDivElement | undefined | null,
  plugins: Plugin[] = [],
  imageProps: ImageProps = {},
  setEditorView: ({ view }: { view: EditorView }) => void,
  format?: Format
): { translator?: any } => {
  const schema = buildSchema(plugins)
  const { upload, previewUrl } = imageProps
  const translator = buildTranslator(schema, format)

  if (!el) return {}

  /**
   * Create a new Prosemirror EditorView on in the DOM
   */
  const view = new EditorView(el, {
    nodeViews: nodeViews() as any,
    /**
     * The initial state of the Wysiwyg
     */
    state: createEditorState(
      schema,
      translator,
      plugins,
      input.value,
      upload,
      previewUrl
    ),
    /**
     * Call input.onChange with the translated content after updating
     * the Prosemiror state.
     * @param tr
     */
    dispatchTransaction(tr) {
      const nextState: any = view.state.apply(tr as any)

      view.updateState(nextState as any)
      setEditorView({ view })

      if (tr.docChanged) {
        input.onChange(translator!.stringFromNode(tr.doc))
      }
    },
  })

  setEditorView({ view })

  return { translator }
}
