import SearchAndFilter from "../../components/SearchAndFilter"
import FilterChipContainer from "../../components/FilterChipContainer"
import ThirdPartyListContainer from "../../components/ThirdPartyListContainer"

const MainPage = () => {

  return (
    <div style={{ margin: '16px 32px' }}>
      <SearchAndFilter id="MainPage-SearchAndFilter" />
      <FilterChipContainer id="MainPage-FilterChipContainer" />
      <ThirdPartyListContainer id="MainPage-ThirdPartyListContainer" />
    </div>
  )
}

export default MainPage