import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTrigger,
  useModalContext,
} from "@wp-g2/components"
import { Link } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const CloseButton = React.forwardRef(
  ({ children = "Done", variant = "primary" }, ref) => {
    const { dialog } = useModalContext()

    return (
      <Button onClick={dialog.hide} ref={ref} variant={variant}>
        {children}
      </Button>
    )
  }
)

const MM = () => {
  return (
    <Modal renderTrigger={<ModalTrigger>Open</ModalTrigger>} visible>
      <ModalHeader title={"Modal Title"} />
      <ModalBody>
        <h2>First</h2>
        <Modal renderTrigger={<ModalTrigger>Open</ModalTrigger>}>
          <ModalHeader title={"Inner Modal Title"} />
          <ModalBody>
            <h2>Second</h2>
            <Modal renderTrigger={<ModalTrigger>Open</ModalTrigger>}>
              <ModalHeader title={"Third Inner Modal Title"} />
              <ModalBody>
                <h2>Third</h2>
              </ModalBody>
              <ModalFooter>
                <CloseButton />
              </ModalFooter>
            </Modal>
          </ModalBody>
        </Modal>
      </ModalBody>
    </Modal>
  )
}

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <Button>Thing</Button>
    <MM />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
