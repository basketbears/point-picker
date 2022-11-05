import { Box, Flex, Grid } from "@chakra-ui/react";
import { memo, ReactElement, useContext, useMemo } from "react";
import { PlayerSelectionContext } from "../player-selection-context";
import { SelectedPlayer } from "./selected-player";


const SelectedPlayersComponent = (): ReactElement => {
  const {selectedPlayers, removePlayer} = useContext(PlayerSelectionContext);

  const sortedSelectedPlayers = useMemo(() => {
    return selectedPlayers.sort((player1, player2) => {
      return player2.totalPoints - player1.totalPoints;
    });
  }, [selectedPlayers])

  const totalPoints = useMemo(() => {
    let result = 0;
    for (const player of selectedPlayers) {
      result += player.totalPoints;
    }
    return result;
  }, [selectedPlayers]);
  return (
    <Flex
      direction="column"
      width="100%"
      height="110px"
      backgroundColor="blue.50"
      boxShadow="0px 0px 8px 0px #959595"
      padding="8px"
    >
      <Box fontWeight="bold">{'Kader'}</Box>
      <Flex>
      <Flex gap="8px" alignItems="start">
        {sortedSelectedPlayers.map((player) => {
          return <SelectedPlayer player={player} onClick={removePlayer}/>
        })}
      </Flex>
      <Flex paddingLeft="10px" width="55px" height="100%" alignItems="end">
        {`= ${totalPoints}`}
      </Flex>
      <Flex
        direction="column"
        width="55px"
        flexGrow="1"
        alignItems="end"
        paddingRight="10px"
        justifyContent="end"
      >
        <Box>{'Übrig'}</Box>
        <Box
          fontWeight="bold"
          fontSize="16px"
        >
          {`${14.5 - totalPoints}`}
        </Box>
      </Flex>
    </Flex>
    </Flex>

  );
};

export const SelectedPlayers = memo(SelectedPlayersComponent);