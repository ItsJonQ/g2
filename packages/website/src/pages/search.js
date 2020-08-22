import { Heading, Spacer, VStack } from "@wp-g2/components"
import React from "react"

import { SiteSearch } from "../components"
import Layout from "../layouts/Docs"

const NotFoundPage = () => (
  <Layout>
    <Spacer py={10}>
      <VStack>
        <Heading size={2}>Search</Heading>
        <SiteSearch />
      </VStack>
    </Spacer>
  </Layout>
)

export default NotFoundPage
