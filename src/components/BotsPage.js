import React, {useEffect, useState} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotSpecs from "./BotSpecs";

function BotsPage() {
  //start here with your code for step one
  const [bots, setBots]= useState([]);
  const [selectedBot, setSelectBot] = useState(false);
  const [botsArmy, setBotsArmy]= useState([]);

useEffect(() => {
    fetch("http://localhost:8002/bots")
    .then((res) => res.json())
    .then((bots) => {
      setBots(bots)
    })
  }, [setSelectBot])

const selectBot = (bot) =>{
  const addToArmy = bots.find((bort)=> bort.id === bot.id);
  if (addToArmy){
     setSelectBot(
      botsArmy.filter((bort) => bort.id === bot.id)
     )}

}

const enlistBot = (bot) =>{
  const addToArmy = bots.find((bort) =>bort.id ===bot.id);
  const botIsAvailable = botsArmy.filter((bort) => bort.id === bot.id);
  if(!botIsAvailable){
    setBotsArmy([...botsArmy, addToArmy([0])]);
  };
}

const removeBotFromArmy = async(bot) =>{
  try {
			const res = await fetch(`http://localhost:8002/bots/${bot}`, {
				method: "DELETE",
			});
			const removeBotFromArmy = botsArmy.filter((bort) => bort.id !== bot);
			setBotsArmy(removeBotFromArmy);
		} catch (error) {
			console.log(error);
		}
};

const resetSelectedBot = () => {
		setSelectBot(true);
	}; 


  return (
    <div>
      <YourBotArmy army={botsArmy} removeBotFromArmy={removeBotFromArmy} selectBot={selectBot} />
      {!selectedBot && <BotCollection bots={bots} selectBot={selectBot} />}
      {selectedBot && (
				<BotSpecs enlistBot={enlistBot} resetSelectedBot={resetSelectedBot} bot={selectedBot} />
        )}
    </div>
  );
}

export default BotsPage;
