import React, { useState } from 'react'
import { Select } from '@mantine/core'
import JsonView from '@uiw/react-json-view'
import { basicTheme } from '@uiw/react-json-view/basic'
import { darkTheme } from '@uiw/react-json-view/dark'
import { githubDarkTheme } from '@uiw/react-json-view/githubDark'
import { githubLightTheme } from '@uiw/react-json-view/githubLight'
import { gruvboxTheme } from '@uiw/react-json-view/gruvbox'
import { lightTheme } from '@uiw/react-json-view/light'
import { monokaiTheme } from '@uiw/react-json-view/monokai'
import { nordTheme } from '@uiw/react-json-view/nord'
import { vscodeTheme } from '@uiw/react-json-view/vscode'

const avatar = 'https://i.imgur.com/MK3eW3As.jpg'
const longArray = new Array(10).fill(1)
const example = {
  avatar,
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
  float: 114.514,
  bigint: 10086,
  null: null,
  undefined,
  timer: 0,
  date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)'),
  array: [19, 100.86, 'test', NaN, Infinity],
  nestedArray: [
    [1, 2],
    [3, 4],
  ],
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null,
  },
  longArray,
  string_number: '1234',
}

interface JsonViewerProps <T extends object>{
  /** 是否展示配置 */
  isShowConfig?: boolean
  /** 主题选择宽度 */
  themeSelectWidth?: string | number
  /** This property contains your input JSON */
  value?: T;
  /** Define the root node name. @default undefined */
  keyName?: string | number;
  /** Whether sort keys through `String.prototype.localeCompare()` @default false */
  objectSortKeys?: boolean | ((keyA: string, keyB: string, valueA: T, valueB: T) => number);
  /** Set the indent-width for nested objects @default 15 */
  indentWidth?: number;
  /** When set to `true`, `objects` and `arrays` are labeled with size @default true */
  displayObjectSize?: boolean;
  /** When set to `true`, data type labels prefix values @default true */
  displayDataTypes?: boolean;
  /** The user can copy objects and arrays to clipboard by clicking on the clipboard icon. @default true */
  enableClipboard?: boolean;
  /** When set to true, all nodes will be collapsed by default. Use an integer value to collapse at a particular depth. @default false */
  collapsed?: boolean | number;
  /** Whether to highlight updates. @default true */
  highlightUpdates?: boolean;
  /** Shorten long JSON strings, Set to `0` to disable this feature @default 30 */
  shortenTextAfterLength?: number;
  /** Callback function for when a treeNode is expanded or collapsed */
  onExpand?: (props: {
      expand: boolean;
      value?: T;
      keyid: string;
      keyName?: string | number;
  }) => void;
  /** Fires event when you copy */
  onCopied?: (text: string, value?: T) => void;
}

const JsonViewer: React.FC<JsonViewerProps<object>> = (props) => {
  const { isShowConfig = true, themeSelectWidth = "100%", ...rest } = props
  // 默认dark模式
  const [selectState, setSelectChange] = useState('darkTheme')
  const themeList = ['lightTheme', 'darkTheme', 'basicTheme', 'githubDarkTheme',"githubLightTheme","gruvboxTheme","monokaiTheme","nordTheme","vscodeTheme"]
  const themeMap: { [key: string]: any } = {
    lightTheme,
    darkTheme,
    basicTheme, 
    githubDarkTheme,
    githubLightTheme,
    gruvboxTheme,
    monokaiTheme,
    nordTheme,
    vscodeTheme
  };
  // 动态获取当前主题的样式
  const currentTheme = themeMap[selectState];

  return (
    <div>
      <div style={{marginBottom: '10px',display: isShowConfig ? 'block' : 'none'}}>
        <Select
          comboboxProps={{ withinPortal: true }}
          data={themeList}
          label='主题选择'
          value={selectState}
          onChange={setSelectChange}
          style={{width: themeSelectWidth}}
        />
      </div>
      <JsonView value={example} style={currentTheme} {...rest} />
    </div>
  )
}

export default JsonViewer
