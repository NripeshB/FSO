
const Header = (props)=>{
  // console.log(props.heading);
  return(
  <h1>
    {props.heading}
  </h1>
  )
}
const Parts = (props)=>{
  return(
      <p>
        {props.p} {props.e}
      </p> 
  )
}

const Content = (props)=>{
return(
  <>
    <Parts p={props.p[0].name} e = {props.p[0].exercises} />
    <Parts p={props.p[1].name} e = {props.p[1].exercises} />
    <Parts p={props.p[2].name} e = {props.p[2].exercises} />
  </>
)
}
const Total = (props)=>{
return(
   <p>Number of exercises { props.e[0].exercises +props.e[1].exercises+props.e[2].exercises}</p>
)
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
     <Header  heading= {course}/>
     <Content p = {parts}  />
     <Total  e = {parts} />
    </div>
  )
}

export default App

