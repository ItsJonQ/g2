import { Button, Heading, Spacer, Text, VStack } from "@wp-g2/components"
import { Link } from "gatsby"
import React from "react"

import Layout from "../layouts/Docs"

const NotFoundPage = () => (
  <Layout>
    <Spacer py={10}>
      <VStack spacing={8}>
        <VStack>
          <Heading size={1}>404! Page not found</Heading>
          <Text>Hmm... Looks like we couldn't find that page.</Text>
        </VStack>
        <Button as={Link} size="large" to="/" variant="primary">
          Go Back Home
        </Button>
      </VStack>
    </Spacer>
  </Layout>
)

export default NotFoundPage
