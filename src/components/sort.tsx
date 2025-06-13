interface Props {
  handleSort: (value: "ascend" | "descend") => void;
};

export function Sort ({ handleSort }: Props) {;
  return <>
    <button onClick={() => handleSort("ascend")}>低到高</button>
    <button onClick={() => handleSort("descend")}>高到低</button>
  </>
}