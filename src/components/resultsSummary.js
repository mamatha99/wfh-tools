import React from "react"
import { useTheme } from "@material-ui/core"
import styled from "@emotion/styled"

const SearchTitle = styled.h5`
  margin-top: 20px;
  text-align: center;
  margin: auto;
  `

const Span = styled.span`
  font-weight: 900;
  color: rebeccapurple;
  margin: 0px 8px 0px 8px;
  padding: 2px 10px 5px 10px;
  border-radius: 8px;
  background-color: #ece6ff;
`

const ResultsSummary = ({ numberOfCompanies }) => {
    const theme = useTheme()
    const mode = theme.palette.type

    return (
    <>
      <SearchTitle style={mode==='dark' ? {color: theme.palette.primary.light} : {color: theme.palette.primary.main}}> 
        You have
        <Span>{numberOfCompanies}</Span>
        options
      </SearchTitle>
      <br />
      <div
        style={{
          borderBottom: `1px solid #eeeeee`,
          width: `80%`,
          margin: `auto`,
        }}
      />
    </>
  )
}

export default ResultsSummary
