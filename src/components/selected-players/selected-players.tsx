import { Box, Flex } from "@chakra-ui/react";
import { memo, ReactElement, useMemo } from "react";
import { Player } from "../../contracts";
import { SelectedPlayer } from "./selected-player";

type Props = {
  selectedPlayers: Array<Player>
  removePlayer?: (player: Player) => void;
}

const SelectedPlayersComponent = (props: Props): ReactElement => {
  const {selectedPlayers, removePlayer} = props;

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
      height="115px"
      backgroundColor="blue.50"
      boxShadow="0px 0px 8px 0px #959595"
      padding="8px"
      shrink="0"
    >
      <Box fontWeight="bold">{'Kader'}</Box>
      <Flex height="100%">
        <Flex gap="8px" alignItems="start">
          {sortedSelectedPlayers.map((player) => {
            return <SelectedPlayer key={player.number} player={player} onClick={removePlayer}/>
          })}
        </Flex>
        {
          (selectedPlayers.length > 0) && (
            <Flex paddingLeft="10px" width="60px" height="100%" alignItems="end" fontWeight="bold">
              {`= ${totalPoints}`}
            </Flex>
          )
        }
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
