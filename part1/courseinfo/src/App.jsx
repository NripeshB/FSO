
const Header = (props)=>{
  // console.log(props.heading);
  return(
  <h1>
    {props.heading.name}
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
    <Parts p={props.p.parts[0].name} e = {props.p.parts[0].exercises} />
    <Parts p={props.p.parts[1].name} e = {props.p.parts[1].exercises} />
    <Parts p={props.p.parts[2].name} e = {props.p.parts[2].exercises} />
  </>
)
}
const Total = (props)=>{
return(
   <p>Number of exercises { props.e.parts[0].exercises +props.e.parts[1].exercises+props.e.parts[2].exercises}</p>
)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
     <Header  heading= {course}/>
     <Content p = {course}  />
     <Total  e = {course} />
    </div>
  )
}

export default App

