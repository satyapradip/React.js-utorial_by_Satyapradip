import { Bookmark } from "lucide-react";

/* 
  UNDERSTANDING PROPS IN THIS CARD COMPONENT:
  
  1. What are props?
     - Props are properties/data passed from a parent component (App) to a child component (Card)
     - They make components REUSABLE with different data
  
  2. How do we receive props?
     - Every React component function receives props as its first parameter
     - We write: const Card = (props) => { ... }
     - "props" is an OBJECT containing all the properties passed from the parent
  
  3. What props is this Card receiving?
     - props.brandLogo   (the company logo URL)
     - props.company     (the company name)
     - props.datePosted  (when the job was posted)
     - props.post        (the job title)
     - props.tag1        (first tag like "Full Time")
     - props.tag2        (second tag like "Junior Level")
     - props.pay         (the hourly pay rate)
  
  4. How to use props?
     - Access them using dot notation: props.propertyName
     - Use curly braces {} to insert them into JSX
     - Example: {props.company} displays the company name
*/

const Card = (props) => {
  return (
    <div className="card">
      <div>
        <div className="top">
          {/* Using props.brandLogo to display the company logo */}
          <img src={props.brandLogo} alt="nachioooooo" />
          <button>
            Save <Bookmark size={10} />{" "}
          </button>
        </div>
        <div className="center">
          {/* 
                      Using multiple props in one line:
                      - {props.company} displays the company name
                      - {props.datePosted} displays when the job was posted
                    */}
          <h3>
            {props.company} <span>{props.datePosted}</span>
          </h3>

          {/* Using props.post to display the job title */}
          <h2>{props.post}</h2>

          <div className="tag">
            {/* Using props.tag1 and props.tag2 to display job tags */}
            <h4>{props.tag1}</h4>
            <h4>{props.tag2}</h4>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div>
          {/* Using props.pay to display the hourly rate */}
          <h3>{props.pay}</h3>
          <p>Mumbai, India</p>
        </div>
        <button>Apply Now</button>
      </div>
    </div>
  );
};

export default Card;
