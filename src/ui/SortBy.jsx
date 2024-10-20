import { useSearchParams } from "react-router-dom";
import Select from "./Select";

/* eslint-disable */
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      type="white"
      options={options}
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;