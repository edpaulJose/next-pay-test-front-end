import React from "react"
import SearchAndFilter from "../../components/SearchAndFilter"
import FilterChipContainer from "../../components/FilterChipContainer"
import ThirdPartyListContainer from "../../components/ThirdPartyListContainer"
import PageInformation from "../../components/PageInformation"
import Header from "../../components/Header"

import Grid from "@mui/material/Grid"

const MainPage = () => {

  return (
    <Grid container direction='column'>
      <Grid item>
        <Header />
      </Grid >
      <Grid item>
        <div style={{ margin: '16px 32px' }}>
          <PageInformation id="MainPage-PageInformation" />
          <SearchAndFilter id="MainPage-SearchAndFilter" />
          <FilterChipContainer id="MainPage-FilterChipContainer" />
          <ThirdPartyListContainer id="MainPage-ThirdPartyListContainer" />
        </div>
      </Grid>
    </Grid>
  )
}

export default MainPage