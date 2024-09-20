import React, { useState } from 'react'
import { Button, Dialog, Divider, Group, MantineProvider, Space, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  headingsPlugin,
  linkPlugin,
  MDXEditor,
} from '@mdxeditor/editor'
import JsonView from '@uiw/react-json-view'
import { darkTheme } from '@uiw/react-json-view/dark'

import '@mdxeditor/editor/style.css'

export interface ModalProps {
  /** 标题 */
  title?: string
  /** 错误消息(md格式) */
  msg?: string
  /** 参考链接 */
  ref_url?: string
  /** 消息详情 */
  msgDetail?: object
  /** 对话框是否打开 */
  opened?: boolean
  /** 是否展示toggle按钮 */
  isShowToggleBtn?: boolean
}

const ErrorDialog: React.FC<ModalProps> = (props) => {
  const {
    title = '错误标题',
    msg = '你有一个消息，查看链接详情：\n <a href="https://virtuoso.dev/" style="color: red;" target="_blank">错误</a>',
    ref_url = 'https://www.baidu.com/',
    msgDetail = {
      string: 'Lorem ipsum dolor sit',
      integer: 42,
      timer: 0,
      date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)'),
      object: {
        'first-child': true,
        'second-child': false,
        'last-child': null,
      },
    },
    opened = false,
    isShowToggleBtn = true,
  } = props
  const [isShowMore, setIsShowMore] = useState<boolean>(false)
  const [isDialogOpened, { toggle, close }] = useDisclosure(opened)

  // 查看详情
  const showMoreInfo = () => {
    setIsShowMore(!isShowMore)
  }
  // 跳转到参考链接
  const goToRefUrl = () => {
    window.open(ref_url, '_blank')
  }

  return (
    <MantineProvider>
      {isShowToggleBtn && (
        <Group justify='center'>
          <Button onClick={toggle}>{isDialogOpened ? '隐藏对话框' : '显示对话框'}</Button>
        </Group>
      )}

      {/* 自定义样式, 移动到视口中央 */}
      <style>{`
        .custom-dialog {
            transform: translate(-50%, -50%) !important;
        }
      `}</style>

      <Dialog
        opened={isDialogOpened}
        withCloseButton
        onClose={close}
        size='lg'
        radius='md'
        className='custom-dialog'
        position={{
          top: '50%', // 设置 top 为 50%
          left: '50%', // 设置 left 为 50%
        }}
      >
        <Text size='md' mb='xs' fw={500}>
          {title}
        </Text>
        <Divider my='sm' /> {/* 水平分割线 */}
        <Text size='md' mb='xs' fw={500} display={'flex'}>
          <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            <svg
              className='icon'
              viewBox='0 0 1024 1024'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              style={{ cursor: 'pointer' }}
              onClick={goToRefUrl}
            >
              <path
                d='M512 981.333333C252.8 981.333333 42.666667 771.2 42.666667 512S252.8 42.666667 512 42.666667s469.333333 210.133333 469.333333 469.333333-210.133333 469.333333-469.333333 469.333333z m44.245333-469.333333l159.914667-159.914667a31.274667 31.274667 0 1 0-44.245333-44.245333L512 467.754667 352.085333 307.84a31.274667 31.274667 0 1 0-44.245333 44.245333L467.754667 512l-159.914667 159.914667a31.274667 31.274667 0 1 0 44.245333 44.245333L512 556.245333l159.914667 159.914667a31.274667 31.274667 0 1 0 44.245333-44.245333L556.245333 512z'
                fill='#F5222D'
              ></path>
            </svg>
            <MDXEditor readOnly markdown={msg} plugins={[headingsPlugin(), linkPlugin()]} />
          </div>
        </Text>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={showMoreInfo}
            rightSection={
              isShowMore ? (
                <svg
                  className='icon'
                  viewBox='0 0 1024 1024'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                >
                  <path
                    d='M511.965867 256c-3.456-0.042667-6.741333 0.554667-10.112 1.322667-1.450667 0.341333-2.858667 0.554667-4.266667 1.066666-6.954667 2.304-13.525333 5.717333-18.688 11.477334l-382.762667 427.178666a42.461867 42.461867 0 0 0 3.754667 60.288c17.834667 15.573333 45.312 13.909333 61.098667-3.712l350.976-391.722666 351.061333 391.722666c15.786667 17.621333 43.264 19.285333 61.098667 3.712a42.461867 42.461867 0 0 0 3.754666-60.288L545.024 269.866667c-5.162667-5.76-11.733333-9.173333-18.688-11.477334-1.408-0.512-2.816-0.725333-4.266667-1.066666-3.370667-0.768-6.656-1.365333-10.112-1.322667'
                    fill='#ffffff'
                  ></path>
                </svg>
              ) : (
                <svg
                  className='icon'
                  viewBox='0 0 1024 1024'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                >
                  <path
                    d='M512.0512 768c3.456 0.042667 6.741333-0.554667 10.112-1.322667 1.450667-0.341333 2.858667-0.554667 4.266667-1.066666 6.954667-2.304 13.525333-5.717333 18.688-11.477334l382.762666-427.178666a42.461867 42.461867 0 0 0-3.754666-60.288c-17.834667-15.573333-45.312-13.909333-61.098667 3.712L512.0512 662.101333l-351.061333-391.722666c-15.786667-17.621333-43.264-19.285333-61.098667-3.712a42.461867 42.461867 0 0 0-3.754667 60.288l382.848 427.178666c5.162667 5.76 11.733333 9.173333 18.688 11.477334 1.408 0.512 2.816 0.725333 4.266667 1.066666 3.370667 0.768 6.656 1.365333 10.112 1.322667'
                    fill='#ffffff'
                  ></path>
                </svg>
              )
            }
          >
            查看详情
          </Button>
          <div style={{ display: 'flex' }}>
            <Button onClick={close}>确定</Button>
            <Space w='md' />
            <Button variant='outline' onClick={close}>
              取消
            </Button>
          </div>
        </div>
        {isShowMore && (
          <div style={{ marginTop: '12px' }}>
            <JsonView value={msgDetail} style={darkTheme} />
          </div>
        )}
      </Dialog>
    </MantineProvider>
  )
}

export default ErrorDialog
