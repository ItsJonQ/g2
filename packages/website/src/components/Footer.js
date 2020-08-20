import { Spacer, Text, View } from "@wp-g2/components"
import React from "react"

export function Footer() {
  return (
    <Spacer mb={0} mt={5} py={10}>
      <View as="footer">
        <Text variant="muted">
          © {new Date().getFullYear()}. <strong>G2 Components</strong>.
        </Text>
      </View>
    </Spacer>
  )
}
