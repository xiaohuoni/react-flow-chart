import React from 'react';
import type { FC } from 'react';

import { Item, ItemPanel, RegisterNode } from 'gg-editor';
import ShowItem from './ShowItem';

import { Card } from 'antd';
import styles from './index.less';

const defaultItem = {
  type: 'node',
  size: '80*80',
  shape: 'flow-node',
  model: {
    color: '#FA8C16',
    label: '',
  },
};
interface ItemProps {
  type?: string;
  size?: string;
  shape?: string;
  model?: any;
  src?: string;
}
interface ItemPanelProps {
  data: ItemProps[];
}
const FlowItemPanel: FC<ItemPanelProps> = ({ data }) => {
  const nodeConfig = {
    getDefaulStyle() {
      return {
        fill: '#FFF',
        stroke: '#FFF',
      };
    },
    draw(item: any) {
      const group = item.getGraphicGroup();
      const model = item.getModel();
      const width = 80;
      const height = 80;
      const x = -width / 2;
      const y = -height / 2;
      const borderRadius = 2;
      const keyShape = group.addShape('rect', {
        attrs: {
          x,
          y,
          width,
          height,
          radius: borderRadius,
          zIndex: -1,
        },
      });
      group.addShape('path', {
        attrs: {
          fill: '#FFF',
          stroke: '#FFF',
        },
      });
      group.addShape('image', {
        attrs: {
          x: -20,
          y: -30,
          width: 40,
          height: 40,
          img: model.icon,
        },
      });
      group.addShape('text', {
        attrs: {
          x: 0,
          y: 35,
          textAlign: 'center',
          text: model.label,
          fill: 'rgba(51,51,51,1)',
          fontSize: 15,
          fontWeight: 600,
        },
      });
      return keyShape;
    },
    anchor: [
      [0.5, 0], // 上边中点
      [0.5, 1], // 底边中点
      [0, 0.5], // 左边中点
      [1, 0.5], // 右边中点
    ],
  };
  return (
    <ItemPanel className={styles.itemPanel}>
      <Card bordered={false}>
        <RegisterNode name="flow-node" config={nodeConfig} />
        {data.map((item) => (
          <Item {...defaultItem} {...item}>
            {!item.src && (
              <ShowItem
                showImg={item?.model?.icon}
                label={item?.model?.label}
              ></ShowItem>
            )}
          </Item>
        ))}
      </Card>
    </ItemPanel>
  );
};

export default FlowItemPanel;
