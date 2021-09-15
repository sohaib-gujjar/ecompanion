import React from 'react';
import _ from 'lodash'

export class RangeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skills : this.props.defaultValues ? this.props.defaultValues : this.props.items
        }
    }

    onSliderChange = (e) => {
        let change = false;
        let skills = this.props.defaultValues;
        if(skills){
            for (let i = 0; i < skills.length; i++) {
                if (skills[i].skill.name === e.target.name) {
                    skills[i].level = e.target.value;
                    this.props.onChange(this.props.value, skills);
                    change = true;
                    break;
                }
            }
        }
        if (!change) {
            for (let i = 0; i < this.props.items.length; i++) {
                if (this.props.items[i].name === e.target.name) {
                    let skills = this.props.defaultValues;
                    let val = this.props.items[i];
                    //val.level = e.target.value;
                    let newSkill = {
                        id : val.id,
                        skill : val,
                        level : e.target.value
                    };
                    skills.push(newSkill);
                    this.props.onChange(this.props.value, skills);
                    break;
                }

            }
        }
    };

    updateValue() {
        var inputs = document.querySelectorAll('[id^="sliderRange"]');
        var inputValues = document.querySelectorAll('[id^="sliderValue"]');
        for (let i = 0; i < inputs.length; i++) {
            inputValues[i].innerHTML = inputs[i].value;
            inputs[i].oninput = function () {
                inputValues[i].innerHTML = this.value;
            }
        }
    }

    render() {
        let defaultValues = this.props.defaultValues;

        let sliderItems = _.map(this.props.items, (item, index) => {
            let value = 0;
            for( let i=0; i< defaultValues.length; i++ ){
                if(defaultValues[i].skill.name === item.name){
                    value = defaultValues[i].level;
                    break;
                }
            }
            return (
                <div className="sliders-block" key={"Range" + index}>
                    <p className="slider-name">{item.name}</p>

                    <input type="range" min="0" max={item.level} value={value} className="slider" id={"sliderRange" + index} name={item.name} onChange={this.onSliderChange} />
                    <p className="slider-value"><span id={"sliderValue" + index}></span> &#37;</p>

                </div>
            );
        });
        return (
            <div className="range-slider">
                <div className="title-block">
                    <p className="title">{this.props.title}</p>
                    <p>{this.props.placeholder}</p>
                </div>
                <div className="slider-container">
                    {sliderItems}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.updateValue();
    };
}