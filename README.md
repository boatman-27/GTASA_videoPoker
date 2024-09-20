# GTA San Andreas Video Poker Clone

This project is a video poker game based on the mini-game from GTA San Andreas found in the The Four Dragons Hotel & Casino. It is built using **React** and **TailwindCSS**, with state management handled via React's Context API. The poker game is implemented as "Jacks or Better," a popular version of video poker.

## Features

- **Deal and Hold**: Players can deal 5 cards and hold or discard them in a second round.
- **Jacks or Better**: Game follows the poker hand ranking rules of "Jacks or Better."
- **Betting System**: Players can choose from different bet increments, with their balance updating based on wins and losses.
- **Hand Evaluation**: Determines poker hands like "Full House," "Flush," and "Straight."
- **Persistence**: Game data such as card draws and balance are saved in `localStorage`.

## Tech Stack

- **React**: Frontend framework.
- **TailwindCSS**: For styling.
- **Vite**: Build tool for a fast development experience.
- **React Hot Toast**: For toasting notifications.
- **React Router**: For page navigation (if needed in future updates).
- **Context API**: Used to manage game states like cards, bets, and balance.

## Installation

1. Clone the repository:

```bash
https://github.com/boatman-27/GTASA_videoPoker.git
```

2. Navigate to the project directory:

```bash
cd gtasa-videopoker
```

3. Install the required dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

## Game Overview

The goal of the game is to get the best possible poker hand using a standard 52-card deck. Players can:

- Place a bet in increments of $50, $100, $1,000, $5,000, or $10,000.
- Deal cards and hold any number of them for the second deal.
- After two deals, the game determines the hand rank, compares it to the payout table, and rewards accordingly.

## Game Logic

- The cards are dealt using the `chooseCards` function, which generates random cards from a deck. Players can choose to hold cards, and the second deal replaces non-held cards.

- Players start with a balance (default: $10,000). They can select a betting increment and place a wager. The game tracks wins and losses and updates the player's balance accordingly.

- The game state, including the player's balance, held cards, and drawn cards, is stored in localStorage. This allows for persistence between sessions.

- Poker hands are evaluated based on standard poker rules with "Jacks or Better" as the lowest winning hand. The `determineHandRank` function checks for hands and then compares it to the payout table depending on the betting level and the rank of the hand.

## Payout Table

| Hand Rank       | Level 1 | Level 2 | Level 3 | Level 4 | Level 5 |
| --------------- | ------- | ------- | ------- | ------- | ------- |
| Royal Flush     | 250     | 500     | 750     | 1000    | 4000    |
| Straight Flush  | 50      | 100     | 150     | 200     | 250     |
| Four of a Kind  | 25      | 50      | 75      | 100     | 125     |
| Full House      | 9       | 18      | 27      | 36      | 45      |
| Flush           | 6       | 12      | 18      | 24      | 30      |
| Straight        | 4       | 8       | 12      | 16      | 20      |
| Three of a Kind | 3       | 6       | 9       | 12      | 15      |
| Two Pair        | 2       | 4       | 6       | 8       | 10      |
| Jacks or Better | 1       | 2       | 3       | 4       | 5       |

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
