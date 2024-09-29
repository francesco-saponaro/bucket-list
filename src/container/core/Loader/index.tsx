import styles from './index.module.scss';
import "./loader-recharts.scss";
import clsx from 'clsx';
import { PieChart, Pie } from 'recharts';

const data = [
  { name: 'Group A', value: 70 },
];


type LoaderProps = {
  value?: number;
};

type LabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number;
  index: number;
};

// const customLabel: React.FC<LabelProps> = (props) => {
//   const { value } = props;

//   return (
//     <text
//       className={styles.loader_text}
//       x={200}
//       y={210}
//       fill={'#ffffff'}
//       textAnchor="middle"
//       dominantBaseline="middle"
//     >
//       {value}%
//     </text>
//   );
// };


const DynamicLoader: React.FC<LoaderProps> = ({
  value = 70,
}) => {
  const endAngle = -((value * 360 / 100) - 90);
  const dinamicWidth = window.innerWidth;
  data[0].value = value;

  return (
    <div className={clsx(styles.loader_container, "recharts-loader")}>
      <div className={styles.loader_text}>{value}%</div>
      {/* <PieChart width={dinamicWidth} height={400}> */}
      <PieChart width={dinamicWidth} height={400}>
        <Pie
          data={data}
          cx={dinamicWidth / 2}
          cy={200}
          startAngle={0}
          endAngle={360}
          innerRadius={60}
          outerRadius={80}
          cornerRadius={40}
          fill="#ffffff"
          paddingAngle={0}
          dataKey="value"
          stroke='#ffffff'
          animationDuration={10}
        />
        <Pie
          data={data}
          cx={dinamicWidth / 2}
          cy={200}
          startAngle={90}
          endAngle={endAngle}
          innerRadius={60}
          outerRadius={80}
          cornerRadius={40}
          fill="#63E9D6"
          stroke='#63E9D6'
          paddingAngle={0}
          dataKey="value"
          // label={customLabel}
          labelLine={false}
        />
      </PieChart>
    </div>
  );
};

export default DynamicLoader;

