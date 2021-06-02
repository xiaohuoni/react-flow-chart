import React from 'react';
import { RegisterEdge } from 'gg-editor';

class EdgeNode extends React.Component {
  render() {
    const config = {
      getLabel(item) {
        const model = item.getModel();
        const { label } = model;
        if (!label) return label;
        try {
          const labelArr = label.split('');
          const count = parseInt(label.length / 6, 10);
          // eslint-disable-next-line no-plusplus
          for (let key = 1; key <= count; key++) {
            if (label[key * 6 - 1])
              label[key * 6 - 1] = `${label[key * 6 - 1]}\n`;
          }
          return labelArr.join('');
        } catch (error) {
          return label;
        }
      },
      getDefaultLabelRectStyle() {
        return {
          fill: 'white',
          stroke: '#CCCCCC',
        };
      },
      getSelectedStyle(item) {
        return {
          stroke: '#FF0000',
          lineWidth: 3,
        };
      },
      getStyle(item) {
        const model = item.getModel();
        const { color, serviceList } = model;
        let trueColor = color;
        if (item.isSelected) {
          trueColor = '#FF0000';
        }
        if (serviceList && serviceList.length > 0) {
          return {
            stroke: trueColor || '#A3B1BF',
            lineWidth: 3,
            endArrow: true,
          };
        }
        return {
          stroke: trueColor || '#A3B1BF',
          lineWidth: 4,
          lineDash: [5, 5, 5],
          endArrow: true,
        };
      },
    };

    return <RegisterEdge name="edge-node-line" config={config} extend="line" />;
  }
}

export default EdgeNode;
