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

import * as React from 'react'
import { UnorderedListIcon, OrderedListIcon } from '@tinacms/icons'

import { toggleBulletList, toggleOrderedList } from '../commands'
import { commandContrl } from '../../Menu'

export const ToolbarComponent = (props: any) => (
  <>
    <BulletList {...props} />
    <OrderedList {...props} />
  </>
)

const BulletList = commandContrl(
  toggleBulletList,
  UnorderedListIcon,
  'Unordered List',
  'Unordered List'
)

const OrderedList = commandContrl(
  toggleOrderedList,
  OrderedListIcon,
  'Ordered List',
  'Ordered List'
)
