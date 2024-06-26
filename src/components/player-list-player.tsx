import { Box, BoxProps, Flex, Grid } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Player } from "../contracts";
import { PlayerPicture } from "./player-picture";
import { pxToRem } from "../scale";

type Props = BoxProps & {
  player: Player
  isGreyedOut?: boolean;
  showAsNew?: boolean;
  showAsOld?: boolean
  onPlayerClick?: (player: Player) => void;
}

export const PlayerListPlayer = (props: Props): ReactElement => {
  const {
    player,
    isGreyedOut = false,
    showAsNew,
    showAsOld,
    onPlayerClick,
  } = props;

  const handleClick = () => {
    window.navigator.vibrate(10);
    onPlayerClick?.(player);
  };

  return (
    <Grid
      key={player.number}
      gridAutoRows="min-content"
      gridTemplateColumns={`${pxToRem(50)}rem 1fr max-content`}
      columnGap="0.375rem"
      width="100%"
      opacity={isGreyedOut ? '0.5' : '1'}
      onClick={handleClick}
    >
      <PlayerPicture player={player} isNew={showAsNew} isOld={showAsOld}/>
      <Box whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden" lineHeight={`${pxToRem(50)}rem`}>{player.displayName}</Box>
      <Flex alignItems="center">{`${player.totalPoints}`}</Flex>
    </Grid>
  )
};
