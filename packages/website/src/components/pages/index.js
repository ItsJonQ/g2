import { Card, Container, Heading, Spacer, Text, View } from "@wp-g2/components"
import { ui } from "@wp-g2/styles"
import React from "react"

export const Section = ({ children, css, pb = 0, py = 30 }) => {
  return (
    <View
      as="section"
      css={[
        { minHeight: "50vh" },
        ui.padding.y(py),
        ui.padding.bottom(pb),
        ui.padding.x(5),
        css,
      ]}
    >
      <Container width={880}>{children}</Container>
    </View>
  )
}

export const Heading1 = props => (
  <Spacer as="header" mb={10}>
    <Heading
      letterSpacing="-0.015em"
      lineHeight={1}
      size={["3em", "4.5em"]}
      weight={700}
      {...props}
    />
  </Spacer>
)
export const Heading2 = props => <Heading1 size={["2.5em", "4em"]} {...props} />
export const Heading3 = props => <Heading1 size={["2em", "3.5em"]} {...props} />
export const Heading4 = props => (
  <Heading1 size={["1.75em", "3em"]} {...props} />
)

export const GlassCard = ({
  css,
  children,
  height,
  label,
  width,
  padding = ui.space(5),
}) => {
  return (
    <Card
      className="GlassCard"
      css={[
        {
          background: "rgba(56, 88, 233, 0.06)",
          boxShadow: "0 0 0 1px rgba(56, 88, 233, 0.2)",
          color: ui.get("colorAdmin"),
          width,
          height,
          padding,
        },
        label && ui.padding.top(7),
        ui.position.relative(),
        css,
      ]}
      elevation={3}
    >
      {label && (
        <View
          css={[
            ui.position.topStart(),
            ui.offset({ x: 20, y: 10 }),
            ui.opacity(0.3),
          ]}
        >
          <Text color="currentColor" isBlock size={6} upperCase>
            {label}
          </Text>
        </View>
      )}

      {children}
    </Card>
  )
}

export const FadeIn = ({ children }) => {
  const [fade, setFade] = React.useState(false)

  React.useEffect(() => {
    requestAnimationFrame(() => {
      setFade(true)
    })
  })

  const staggered = Array.from(Array(10).keys())
    .map(
      (_, index) => `
    *:nth-child(${index}) {
      transition-delay: ${index * 200}ms;
    }
  `
    )
    .join("\n")

  const classes = [
    `
      * {
        opacity: 0;
        transition: opacity 300ms linear;
      }
    `,
    staggered,
  ]

  const fadeIn = ui.css`
  * {
    opacity: 1;
  }
  `

  return <View css={[...classes, fade && fadeIn]}>{children}</View>
}

export const GradientText = props => {
  return (
    <View
      as="span"
      css={`
        background: linear-gradient(
          to right,
          rgb(241, 77, 151),
          rgb(56, 88, 233)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: inherit;
      `}
      {...props}
    />
  )
}

export const CopyText = ({ children }) => {
  return <Container width={560}>{children}</Container>
}
