import React from 'react';
import { Col, Row } from 'antd';
import GGEditor, { Flow, RegisterNode } from 'gg-editor';
import {
  EditorMinimap,
  ContextMenu,
  DetailPanel,
  ItemPanel,
  Toolbar,
} from '@alitajs/flow-chart';
import 'antd/dist/antd.css';
import EdgeNode from './EdgeNode';
import styles from './index.less';
import startImg from './assets/start.png';
import endImg from './assets/end.png';
import copytoImg from './assets/copyto.png';
import inevitableImg from './assets/inevitable.png';
import judgeImg from './assets/judge.png';

GGEditor.setTrackable(false);

export default () => {
  const itemPanelData = [
    {
      shape: 'start-node',
      model: {
        type: 0,
        label: '开始',
        icon: startImg,
      },
    },
    {
      shape: 'start-node',
      model: {
        type: 1,
        label: '必经环节',
        icon: inevitableImg,
      },
    },
    {
      shape: 'start-node',
      model: {
        type: 3,
        label: '抄送',
        icon: copytoImg,
      },
    },
    {
      shape: 'start-node',
      model: {
        type: 2,
        label: '判断',
        icon: judgeImg,
      },
    },
    {
      shape: 'start-node',
      model: {
        type: 0,
        label: '结束',
        icon: endImg,
      },
    },
  ];

  return (
    <GGEditor className={styles.editor}>
      <Row className={styles.editorHd}>
        <Col span={24}>
          <Toolbar />
        </Col>
      </Row>
      <Row className={styles.editorBd}>
        <Col span={4} className={styles.editorSidebar}>
          <ItemPanel data={itemPanelData} />
        </Col>
        <Col span={16} className={styles.editorContent}>
          <Flow
            className={styles.flow}
            graph={{ edgeDefaultShape: 'edge-node-line' }}
            noEndEdge={false}
          />
        </Col>
        <Col span={4} className={styles.editorSidebar}>
          <DetailPanel />
          <EditorMinimap />
        </Col>
      </Row>
      <ContextMenu />
      <RegisterNode
        name="start-node"
        config={{
          label: '',
          color: '#fff',
        }}
        extend="flow-node"
      />
      <EdgeNode />
    </GGEditor>
  );
};
