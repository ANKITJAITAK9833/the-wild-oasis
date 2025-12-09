function App() {
  return (
    <>
      <GlobalStyles />
      <div>
       <Row type="vertical"> 
        <Row type="horizontal">
          <Heading>
            The wild oasis
          </Heading>
          <div>

            <Heading as="h3">
              Buttons
            </Heading>
            <Button   onClick={() => alert("User wants to check in")}>Check in</Button>
            <Button variation="danger" size="large"  onClick={() => alert("User wants to check out")}>Check out</Button>
          </div>
        </Row>
        <Row type="vertical">
          <Heading as="h3"> Form </Heading>
          <form>
            <Input type="number" placeholder="Number of guests" />
            <Input type="number" placeholder="Number of guests" />
          </form>
        </Row>
        </Row>
      </div>
    </>
  )
}

export default App;