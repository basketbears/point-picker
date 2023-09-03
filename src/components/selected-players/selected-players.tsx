import { Box, Flex } from "@chakra-ui/react";
import { memo, ReactElement, useCallback, useMemo } from "react";
import { playerBlock } from "../../assets/styles";
import { Player } from "../../contracts";
import { SelectedPlayer } from "./selected-player";
import { LayoutGroup } from "framer-motion";
import { MotionBox } from "../motion-box";
import { pxToRem, scale } from "../../scale";

type Props = {
  selectedPlayers: Array<Player>
  removePlayer?: (player: Player) => void;
  title?: string
  newPlayerNumbers?: Set<number>;
}

const SelectedPlayersComponent = (props: Props): ReactElement => {
  const {
    selectedPlayers,
    removePlayer,
    title="Kader",
    newPlayerNumbers,
  } = props;

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

  const handleClick = useCallback((player: Player) => {
    window.navigator.vibrate(10);
    removePlayer?.(player);
  }, [removePlayer])

  const remainingPoints = 14.5 - totalPoints;
  return (
    <Flex
      {...playerBlock}
      direction="column"
      width="100%"
      height={`${114 * scale}px`}
      backgroundColor="blue.50"
      border="1px solid #e0e0e0"
      padding="0.5rem"
      shrink="0"
    >
      <Box fontWeight="bold" paddingBottom="0.25rem">{title}</Box>
      <Flex height="100%">
        <LayoutGroup>
          <Flex gap="0.25rem" alignItems="start">
            {sortedSelectedPlayers.map((player) => {
              return <SelectedPlayer key={player.number} player={player} onClick={handleClick} isNew={newPlayerNumbers?.has(player.number)}/>
            })}
          </Flex>
          {
            (selectedPlayers.length > 0) && (
              <MotionBox layout="position">
                <Flex paddingLeft="0.625rem" width="5rem" height="100%" alignItems="end" fontWeight="bold">
                  {`= ${totalPoints}`}
                </Flex>
              </MotionBox>
            )
          }
          <Flex
            flexDirection="column"
            width={`${pxToRem(55)}rem`}
            flexGrow="1"
            alignItems="end"
            paddingRight="0.625rem"
            justifyContent="end"
          >
            <Box>{'Übrig'}</Box>
            <Box
              fontWeight="bold"
              fontSize={remainingPoints < 0 ? '1.25rem': '1rem'}
              color={remainingPoints < 0 ? 'red': undefined}
            >
              {`${remainingPoints}`}
            </Box>
          </Flex>
        </LayoutGroup>
      </Flex>
    </Flex>

  );
};

export const SelectedPlayers = memo(SelectedPlayersComponent);
