import type { ReactNode } from 'react';
import { typeToReactNode } from './type-anchor';

interface PropItem {
  /** 属性名 */
  name: string;
  /** 说明 */
  description: ReactNode;
  /** 类型 */
  type: ReactNode;
  /** 默认值 */
  default?: string;
  /** 是否必填 */
  required?: boolean;
}

interface PropsTableProps {
  /** 表格数据 */
  data: PropItem[];
}

function renderType(type: ReactNode): ReactNode {
  if (typeof type === 'string') {
    return typeToReactNode(type);
  }
  return type;
}

const PropsTable = (props: PropsTableProps) => {
  const { data } = props;

  return (
    <div className="not-prose my-8">
      <table className="w-full table-fixed border-collapse text-[14px] leading-[1.7]">
        <colgroup>
          <col className="w-[18%]" />
          <col className="w-[36%]" />
          <col className="w-[33%]" />
          <col className="w-[13%]" />
        </colgroup>
        <thead>
          <tr className="border-b-2 border-fd-border">
            <th className="py-3 pr-4 text-left font-semibold text-fd-foreground">属性</th>
            <th className="py-3 pr-4 text-left font-semibold text-fd-foreground">说明</th>
            <th className="py-3 pr-4 text-left font-semibold text-fd-foreground">类型</th>
            <th className="py-3 text-left font-semibold text-fd-foreground">默认值</th>
          </tr>
        </thead>
        <tbody className="text-fd-foreground/90">
          {data.map((item) => (
            <tr
              key={item.name}
              className="border-b border-fd-border/50 transition-colors duration-150 hover:bg-fd-accent/5"
            >
              <td className="break-all pl-3 py-3 pr-4 border-r align-top font-mono text-[13px] text-fd-primary">
                {item.name}
                {item.required ? (
                  <span className="ml-1 text-[11px] text-red-500" aria-label="必填" title="必填">
                    *
                  </span>
                ) : null}
              </td>
              <td className="py-3 pr-4 pl-3 align-top border-r text-fd-foreground/75">{item.description}</td>
              <td className="break-all pl-3 py-3 pr-4 border-r align-top font-mono text-[13px] text-fd-foreground/65">
                {renderType(item.type)}
              </td>
              <td className="py-3 align-top pl-3 font-mono text-[13px] text-fd-foreground/55">
                {item.default ?? '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { PropsTable };
export type { PropItem, PropsTableProps };
