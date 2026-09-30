import type { Card } from '../models/Card';

class GameValidator {

  isValidTurn(
    currentTurn: string,
    playerId: string
  ): boolean {
    return currentTurn === playerId;
  }

  isValidCard(
    cards: Card[],
    cardId: string
  ): boolean {
    return cards.some(card => card.id === cardId);
  }

  hasCompleted(cards: Card[]): boolean {
    if (cards.length !== 4) {
      return false;
    }

    return cards.every(
      card => card.value === cards[0].value
    );
  }
}

export default new GameValidator();