import styles from "./Table.module.css";
const Table = (props: any) => {
  return (
    <table className={styles["container"]}>
      <tr>
        {props.headers.map((header: string, i: number) => {
          return <th key={i}>{header}</th>;
        })}
      </tr>

      {props.table.map((rows: string[], i: number) => (
        <tr key={i}>
          {rows.map((row: string) => (
            <td key={i}>{row}</td>
          ))}
        </tr>
      ))}
    </table>
  );
};
export default Table;
