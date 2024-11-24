import { useState } from 'react';
import './calculate.css';

const Calculate = () => {
    const [carbonEmission, setCarbonEmission] = useState(0);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        const formData = {};
        const formData2 = {};

        form.forEach((value, key) => {
            const [group, question] = key.split(':');
            if (!formData[group]) {
                formData[group] = {};
            }
            formData[group][question] = value;



            const selectElement = e.target.querySelector(`[name="${key}"]`);

            if (selectElement) {
                const labelElement = e.target.querySelector(`label[for="${key}"]`);
                const label = labelElement ? labelElement.textContent.trim() : key;

                const selectedOption = selectElement.options[selectElement.selectedIndex].textContent.trim();
                if (!formData2[group]) {
                    formData2[group] = {};
                }
                formData2[group][label] = selectedOption;
            }

            
        });

        console.log(formData)
        console.log(formData2)
        try {
            const result = await fetch('https://1f02-82-194-22-102.ngrok-free.app/calculate', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await result.json();
            console.log(data)
            setCarbonEmission(data.carbon_emission_per_day?.toFixed(1));
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="calculation_page">
            <div className="container">
                <h1>Answer questions below to calculate your carbon emission!</h1>
                <div className="result">
                    <p>{carbonEmission} <span>kg/day</span></p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="question_group">
                        <h2>Transportation</h2>

                        <div className="input_group">
                            <label htmlFor="transportation:t1">
                                How many hours per day do you drive a personal car?
                            </label>
                            <select name="transportation:t1" id="transportation:t1">
                                <option value="0">Never</option>
                                <option value="30">0-2</option>
                                <option value="90">2-4</option>
                                <option value="180">4-8</option>
                                <option value="300">8+</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="transportation:t2">What type of car do you drive?</label>
                            <select name="transportation:t2" id="transportation:t2">
                                <option value="2.31">Petrol</option>
                                <option value="0">Electric</option>
                                <option value="1.87">Gas</option>
                                <option value="1.15">Hybrid</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="transportation:t3">
                                What is your car’s average fuel efficiency (liters per 100 kilometers)?
                            </label>
                            <select name="transportation:t3" id="transportation:t3">
                                <option value="6">4-8</option>
                                <option value="10">8-12</option>
                                <option value="14">12-16</option>
                                <option value="18">16-20</option>
                                <option value="22">20+</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="transportation:t4">How frequently do you use a taxi?</label>
                            <select name="transportation:t4" id="transportation:t4">
                                <option value="0">Never</option>
                                <option value="35">Once a week</option>
                                <option value="87.5">2-3 times a week</option>
                                <option value="157.5">4-5 times a week</option>
                                <option value="227.5">Every day</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="transportation:t5">How frequently do you use a bus?</label>
                            <select name="transportation:t5" id="transportation:t5">
                                <option value="0">Never</option>
                                <option value="21">Once a week</option>
                                <option value="52.5">2-4 times a week</option>
                                <option value="121">5-6 times a week</option>
                                <option value="136.5">Every day</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="transportation:t6">How frequently do you use a subway?</label>
                            <select name="transportation:t6" id="transportation:t6">
                                <option value="0">Never</option>
                                <option value="27">Once a week</option>
                                <option value="67.5">2-4 times a week</option>
                                <option value="148.5">5-6 times a week</option>
                                <option value="175.5">Every day</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="transportation:t7">How many flights do you take in a year?</label>
                            <select name="transportation:t7" id="transportation:t7">
                                <option value="0">Never</option>
                                <option value="195">1-2 times per year</option>
                                <option value="520">3-5 times per year</option>
                                <option value="910">6-8 times per year</option>
                                <option value="1300">8+</option>
                            </select>
                        </div>
                    </div>


                    <div className="question_group">
                        <h2>Energy and Household</h2>

                        <div className="input_group">
                            <label htmlFor="home:h1">What is the primary source of energy for your home?</label>
                            <select name="home:h1" id="home:h1">
                                <option value="0.04">Electricity</option>
                                <option value="0.14">Gas</option>
                                <option value="1">Natural</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="home:h2">How many hours per day do you keep lights on at home?</label>
                            <select name="home:h2" id="home:h2">
                                <option value="0.2">1-3 hours</option>
                                <option value="0.45">3-6 hours</option>
                                <option value="0.8">6-10 hours</option>
                                <option value="1.25">10-15 hours</option>
                                <option value="1.7">15+</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="home:h3">How many people live in your household?</label>
                            <select name="home:h3" id="home:h3">
                                <option value="1">1</option>
                                <option value="2.5">2-3</option>
                                <option value="4.5">4-5</option>
                                <option value="6">5+</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="home:h4">Do you use renewable energy sources for your electricity?</label>
                            <select name="home:h4" id="home:h4">
                                <option value="0.1">Yes</option>
                                <option value="1">No</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="home:h5">How many square kilometers is your house (m²)?</label>
                            <select name="home:h5" id="home:h5">
                                <option value="20">15-25</option>
                                <option value="35">25-40</option>
                                <option value="50">40-60</option>
                                <option value="80">60-100</option>
                                <option value="120">100+</option>
                            </select>
                        </div>
                    </div>



                    <div className="question_group">
                        <h2>Food Consumption</h2>

                        <div className="input_group">
                            <label htmlFor="food:f1">What kind of diet do you follow?</label>
                            <select name="food:f1" id="food:f1">
                                <option value="1">Meat-eater</option>
                                <option value="0.33">Vegan</option>
                                <option value="0.66">Vegetarian</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="food:f2">How many grams of meat do you consume per month?</label>
                            <select name="food:f2" id="food:f2">
                                <option value="13.5">1000-2000 gr</option>
                                <option value="54">2000-4000 gr</option>
                                <option value="181.5">4000-7000 gr</option>
                                <option value="486">7000-11000 gr</option>
                                <option value="726">11000+</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="food:f3">Do you buy or produce products?</label>
                            <select name="food:f3" id="food:f3">
                                <option value="0.331">Produce</option>
                                <option value="1">Buy</option>
                                <option value="0.662">Both</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="food:f4">How often do you order a meal?</label>
                            <select name="food:f4" id="food:f4">
                                <option value="0">Never</option>
                                <option value="4">Once a week</option>
                                <option value="9">2-4 times a week</option>
                                <option value="52">Every day</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="food:f5">Do you mainly drink bottled water or tap water at home?</label>
                            <select name="food:f5" id="food:f5">
                                <option value="0.2">Tap</option>
                                <option value="0.6">Both</option>
                                <option value="1">Bottled</option>
                            </select>
                        </div>
                    </div>



                    <div className="question_group">
                        <h2>Waste Management</h2>

                        <div className="input_group">
                            <label htmlFor="waste:w1">Do you reuse materials like paper, plastic, and glass?</label>
                            <select name="waste:w1" id="waste:w1">
                                <option value="0.33">Yes</option>
                                <option value="1">No</option>
                                <option value="0.66">Sometimes</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="waste:w2">Do you separate recyclable waste from general trash?</label>
                            <select name="waste:w2" id="waste:w2">
                                <option value="0.33">Yes</option>
                                <option value="1">No</option>
                                <option value="0.66">Sometimes</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="waste:w3">Do you properly dispose of electronic waste?</label>
                            <select name="waste:w3" id="waste:w3">
                                <option value="0.33">Yes</option>
                                <option value="1">No</option>
                                <option value="0.66">Sometimes</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="waste:w4">How many garbage bags does your household produce weekly?</label>
                            <select name="waste:w4" id="waste:w4">
                                <option value="18">1-2</option>
                                <option value="42">3-4</option>
                                <option value="66">5-6</option>
                                <option value="90">7-8</option>
                                <option value="108">8+</option>
                            </select>
                        </div>
                    </div>


                    <div className="question_group">
                        <h2>Industrial Production</h2>

                        <div className="input_group">
                            <label htmlFor="industry:i1">How often do you buy new clothes or accessories?</label>
                            <select name="industry:i1" id="industry:i1">
                                <option value="88.5">Every week</option>
                                <option value="33.5">Every 2 weeks</option>
                                <option value="6.6">Every month</option>
                                <option value="1.25">Every 2-3 months</option>
                                <option value="0.7">After 2-3 months</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="industry:i2">How often do you replace gadgets like phones or laptops?</label>
                            <select name="industry:i2" id="industry:i2">
                                <option value="0.45">Every year</option>
                                <option value="0.15">Every 2 years</option>
                                <option value="0.07">Every 3 years</option>
                                <option value="0.04">After 3 years</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="industry:i3">Do you use second-hand or thrifted items?</label>
                            <select name="industry:i3" id="industry:i3">
                                <option value="0.4">Yes</option>
                                <option value="1">No</option>
                                <option value="0.7">Sometimes</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="industry:i4">Do you choose products made from recycled materials?</label>
                            <select name="industry:i4" id="industry:i4">
                                <option value="0.25">Yes</option>
                                <option value="1">No</option>
                                <option value="0.6">Sometimes</option>
                            </select>
                        </div>
                    </div>


                    <div className="question_group">
                        <h2>Water Heating and Usage</h2>

                        <div className="input_group">
                            <label htmlFor="water:w1">How often do you take showers?</label>
                            <select name="water:w1" id="water:w1">
                                <option value="1">Once a week</option>
                                <option value="3.5">Every other day</option>
                                <option value="2.5">2-3 times a week</option>
                                <option value="4.5">4-5 times a week</option>
                                <option value="7">Every day</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="water:w2">How often do you wash dishes by hand?</label>
                            <select name="water:w2" id="water:w2">
                                <option value="0.5">Once a week</option>
                                <option value="1.75">Every other day</option>
                                <option value="1.25">2-3 times a week</option>
                                <option value="2.25">4-5 times a week</option>
                                <option value="3.5">Every day</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="water:w3">How many loads of laundry do you do each week?</label>
                            <select name="water:w3" id="water:w3">
                                <option value="1.5">1</option>
                                <option value="3.75">2-3</option>
                                <option value="6.75">4-5</option>
                                <option value="9.75">6-7</option>
                                <option value="10.5">7+</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="water:w4">How often do you use a dishwasher?</label>
                            <select name="water:w4" id="water:w4">
                                <option value="0">Never</option>
                                <option value="2.5">Once a week</option>
                                <option value="7.5">2-4 times a week</option>
                                <option value="13.75">5-6 times a week</option>
                                <option value="17.5">Every day</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="water:w5">Do you turn off the tap while not using water?</label>
                            <select name="water:w5" id="water:w5">
                                <option value="0.1">Yes</option>
                                <option value="1">No</option>
                                <option value="0.6">Sometimes</option>
                            </select>
                        </div>
                    </div>



                    <div className="question_group">
                        <h2>Consumer Goods</h2>

                        <div className="input_group">
                            <label htmlFor="consuming:c1">How many online orders do you make monthly?</label>
                            <select name="consuming:c1" id="consuming:c1">
                                <option value="0">Never</option>
                                <option value="1.5">1-2 times</option>
                                <option value="4">3-5 times</option>
                                <option value="7.5">6-9 times</option>
                                <option value="10">9+</option>
                            </select>
                        </div>

                        <div className="input_group">
                            <label htmlFor="consuming:c2">Do you avoid buying items that you don’t really need?</label>
                            <select name="consuming:c2" id="consuming:c2">
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                                <option value="0.5">Sometimes</option>
                            </select>
                        </div>
                    </div>


                    <button type='submit'>Calculate</button>
                </form>
            </div>
        </div>
    )
}

export default Calculate