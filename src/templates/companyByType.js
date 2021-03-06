import React, { useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { useTheme, Typography, Box, Paper } from "@material-ui/core"
import styled from "@emotion/styled"

import GoToSearch from "../components/goToSearch"
import CompanyCard from "../components/companyCard"
import ContactForm from "../components/contactForm"
import Seo from "../components/seo"
import RangeSlider from "../components/rangeSlider"
import ResultsSummary from "../components/resultsSummary"

const _ = require("lodash")

const Thumbnail = styled.div`
  width: 100px;
  margin: auto;
  margin-bottom: 30px;
  @media (max-width: 450px) {
    width: 100px;
    hight: 100px;
  }
`
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`
const TagLine = styled.h4`
  letter-spacing: 1px;
  color: gray;
  padding: 20px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 0;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const CompanyByType = ({ data, pageContext }) => {
  const theme = useTheme()
  const mode = theme.palette.type

  const companies = data.allAirtable.edges
  const [filteredCompanies, setFilteredCompanies] = useState(companies)
  const type = pageContext.type
  const typeSlug = `${_.kebabCase(type)}/`

  const iconThumbnail = data.Type.edges[0].node.data.Icon.localFiles[0]
  const tagLine = data.Type.edges[0].node.data.TagLine

  function filterByAge(array) {
    let companiesWip = []
    companies.forEach(({ node }) => {
      const company = node.data
      const icon = node.data.Thumbnail.localFiles[0].childImageSharp.fluid
      const Description = company.Description
      const slug = company.slug
      companiesWip.push({
        node: {
          data: {
            Name: company.Name,
            ageMax: Math.max(...company.Age),
            ageMin: Math.min(...company.Age),
            Description,
            icon,
            slug,
          },
        },
      })
    })
    let filteredByAge = companiesWip
    const ageMax = Math.max(...array)
    const ageMin = Math.min(...array)
    filteredByAge = companiesWip.filter(
      company =>
        company.node.data.ageMax >= ageMin && ageMax >= company.node.data.ageMin
    )
    setFilteredCompanies(filteredByAge)
  }

  return (
    <>
      <Seo
        title={`Crushing WFH | ${type}`}
        description={tagLine}
        image={iconThumbnail.publicURL}
        slug={typeSlug}
      />
      <Container>
        <Flex>
          <Thumbnail>
            <Img fluid={iconThumbnail.childImageSharp.fluid} />
          </Thumbnail>
          <Typography
            variant="h4"
            align="center"
            style={
              mode === "light"
                ? { color: theme.palette.primary.main }
                : { color: theme.palette.primary.light }
            }
          >
            <Box fontWeight={900}>{type}</Box>
          </Typography>
          <TagLine>{tagLine}</TagLine>
          {type === "kids" ? (
            <>
              <RangeSlider
                minAge={2}
                maxAge={15}
                onAgeSelection={filterByAge}
              />
              <ResultsSummary numberOfCompanies={filteredCompanies.length} />
            </>
          ) : (
            <ResultsSummary numberOfCompanies={filteredCompanies.length} />
          )}
        </Flex>
        <section>
          <Flex>
            <Container>
              {filteredCompanies.map(({ node }) => {
                const company = node.data
                let icon = ""
                node.data.Thumbnail === undefined
                  ? (icon = company.icon)
                  : (icon =
                      node.data.Thumbnail.localFiles[0].childImageSharp.fluid)
                const brief = company.Description
                return (
                  <Paper style={{ margin: "20px" }} key={company.Name}>
                    <CompanyCard
                      big={true}
                      name={company.Name}
                      brief={brief}
                      icon={icon}
                      slug={company.slug}
                    />
                  </Paper>
                )
              })}
            </Container>
            <div style={{ marginTop: `40px`, alignSelf: `center` }}>
              <GoToSearch />
            </div>
          </Flex>
        </section>
      </Container>
      <section>
        <ContactForm />
      </section>
    </>
  )
}

export const companyByType = graphql`
  query Type($type: String) {
    allAirtable(
      filter: { data: { Publish: { eq: true }, Type: { eq: $type } } }
      sort: { order: ASC, fields: data___Name }
    ) {
      edges {
        node {
          data {
            Name
            slug
            Description
            Created_time(difference: "day")
            Type
            Age
            Thumbnail {
              localFiles {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
    Type: allAirtable(
      filter: { data: { Created_time: { eq: null }, Name: { eq: $type } } }
    ) {
      edges {
        node {
          data {
            IconName
            Name
            TagLine
            Icon {
              localFiles {
                publicURL
                childImageSharp {
                  fluid(grayscale: true) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default CompanyByType
