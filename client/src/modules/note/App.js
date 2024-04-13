import React, { useEffect, useState } from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { SecondaryContentForMenuItems as Navbar } from "./components/Navbar";
//import { ipcRenderer } from 'electron'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  materialDark,
  materialLight,
  oneLight,
} from 'react-syntax-highlighter/dist/cjs/styles/prism'

import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  DrawerProps,
  Button,
  Label,
  Radio,
  RadioGroup,
  makeStyles,
  shorthands,
  tokens,
  useId,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { io } from 'socket.io-client';

const useStyles = makeStyles({
  root: {
    ...shorthands.border("2px", "solid", "#ccc"),
    ...shorthands.overflow("hidden"),

    display: "flex",
    height: "480px",
    backgroundColor: "#fff",
  },

  content: {
    ...shorthands.flex(1),
    ...shorthands.padding("16px"),

    display: "grid",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gridRowGap: tokens.spacingVerticalXXL,
    gridAutoRows: "max-content",
  },

  field: {
    display: "grid",
    gridRowGap: tokens.spacingVerticalS,
  },
});
/*
windowTopBar.style.width = "100%"
windowTopBar.style.textAlign = 'center'
windowTopBar.style.height = "32px"
windowTopBar.style.backgroundColor = 'rgba(0, 0,0, 0.1)'
windowTopBar.style.position = "absolute"
windowTopBar.style.top = windowTopBar.style.left = 0
windowTopBar.style.webkitAppRegion = "drag"
document.body.appendChild(windowTopBar)
*/;

const EventListeners = [];
import { getSioClient, listenEvents } from '../../sio-client';

export default function App({ }) {
  const [markdown, setMarkdown] = useState('*hep*');
  const [initialMarkdown, setInitialMarkdown] = useState(markdown)
  const [enabled, setEnabled] = useState(true);
  const [title_, setTitle_] = useState('');
  const styles = useStyles();
  const labelId = useId("type-label");

  const [isOpen, setIsOpen] = React.useState(false);
  const [type, setType] = React.useState("overlay");






  useEffect(() => {
    const sio = getSioClient();
    if(sio) {
      listenEvents('sync_props', (data) => {
        setTitle_(data.title)
        setMarkdown(data.textContent)
      })
    }
    return () => {
      if (sio) {
        sio.off('connect');
        sio.off('sync_props')
      }
      //window.removeEventListener(listener)
      //sio.off('propsReceived');
    }
  }, [])
  return (<>
    <div style={{
      width: '100%', textAlign: 'center', height: '32px', backgroundColor: 'rgba(0, 0,0, 0.1)', position: 'absolute',
      top: 0, left: 0, WebkitAppRegion: 'drag'
    }}>{title_}</div>
    <div style={{ marginTop: '32px' }}>
      <Navbar />
      <Drawer
        type={type}
        separator
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Default Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </Drawer>

      <div className={styles.content}>
        <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
          {type === "inline" ? "Toggle" : "Open"}
        </Button>

        <div className={styles.field}>
          <Label id={labelId}>Type</Label>
          <RadioGroup
            value={type}
            onChange={(_, data) => setType(data.value)}
            aria-labelledby={labelId}
          >
            <Radio value="overlay" label="Overlay (Default)" />
            <Radio value="inline" label="Inline" />
          </RadioGroup>
        </div>
      </div>
    </div>

    {
      <Markdown remarkPlugins={[remarkGfm]}
        //children={post.content}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={oneLight}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}>{markdown}</Markdown>
    }

    <form spellCheck={false} style={{ width: 'auto', height: 'auto' }}>
      <textarea aria-multiline="true" className="mainText" id="main" value={markdown}

        onFocus={() => setEnabled(false)}
        onBlur={() => {
          setEnabled(true)
        }
        }
        onChange={(evt) => {
          setMarkdown(evt.nativeEvent.target.value)
        }}></textarea>
    </form>
  </>
  );
}