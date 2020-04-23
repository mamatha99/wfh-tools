import React from "react"
import { Link } from "gatsby"
import {Typography, Box , useTheme} from "@material-ui/core" 
import styled from "@emotion/styled"
import Img from "gatsby-image"



const Container = styled.div`
  padding: 10px;
  width: 100%;
  &:hover {
    background-color: #ece6ff;
    border-radius: 5px;
    color: black;
  }
`
const ImgContainer = styled.div`
width: 50px;
`

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`

const CompanyName = styled.h3`
font-weight: 900; 
margin-bottom: 0;
margin-left: 10px;
`

const ListOfCompanies = ({ company }) => {
  
  return (
    <Container>
      <Link
        to={`/${company.data.slug}`}
        style={{ textDecoration: `none`, color: `inherit` }}
      >
        <FlexBox>
          <ImgContainer>
            <Img
              fluid={company.data.Thumbnail.localFiles[0].childImageSharp.fluid}
              alt={company.data.Name}
              style={{ margin: `10px` }}
            />
          </ImgContainer>
         
            <CompanyName >{company.data.Name}</CompanyName>
       
        </FlexBox>
      </Link>
    </Container>
  )
}

export default ListOfCompanies
