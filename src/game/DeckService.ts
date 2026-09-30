import type { Card } from '../models/Card';

class DeckService {

  createDeck(): Card[] {
    const deck: Card[] = [];

    let id = 1;

    for (let value = 1; value <= 13; value++) {
      for (let i = 0; i < 4; i++) {
        deck.push({
          id: `card-${id++}`,
          value
        });
      }
    }

    return deck;
  }

  shuffle(deck: Card[]): Card[] {
    const shuffled = [...deck];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] =
        [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  deal(
    deck: Card[],
    playerIds: string[]
  ): Record<string, Card[]> {

    const hands: Record<string, Card[]> = {};

    playerIds.forEach(id => {
      hands[id] = [];
    });

    let index = 0;

    while (
      index < deck.length &&
      playerIds.some(id => hands[id].length < 4)
    ) {
      for (const playerId of playerIds) {
        if (
          hands[playerId].length < 4 &&
          index < deck.length
        ) {
          hands[playerId].push(deck[index]);
          index++;
        }
      }
    }

    return hands;
  }

  hasFourOfKind(cards: Card[]): boolean {
    if (cards.length !== 4) {
      return false;
    }

    return cards.every(
      card => card.value === cards[0].value
    );
  }
}

export default new DeckService();