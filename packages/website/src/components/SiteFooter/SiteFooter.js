import { Spacer, Text, View } from "@wp-g2/components"
import React from "react"

export function SiteFooter() {
  return (
    <Spacer className="SiteFooter" mb={0} mt={5} py={10}>
      <View as="footer">
        <Text className="SiteFooterText" variant="muted">
          © {new Date().getFullYear()}. <strong>G2 Components</strong>.
        </Text>
      </View>
    </Spacer>
  )
}
