import { Select } from "antd"

const LanguageFilter = ({ options, setFilter }) => {
  return <Select options={options} mode="multiple" allowClear showSearch onChange={setFilter} />
}

export default LanguageFilter
