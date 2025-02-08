// big o complexity: O(sqrt(n))
export default function two_crystal_balls(breaks: boolean[]): number {
    const jumpAmount = Math.floor(Math.sqrt(breaks.length));
    let firstCrystalBall = jumpAmount;

    for (; firstCrystalBall < breaks.length; firstCrystalBall += jumpAmount) {
        if (breaks[firstCrystalBall]) {
            break;
        }
    }

    firstCrystalBall -= jumpAmount;
    for (
        let jump = 0;
        jump < jumpAmount && jump < breaks.length;
        jump++, firstCrystalBall++
    ) {
        if (breaks[firstCrystalBall]) {
            return firstCrystalBall;
        }
    }

    return -1;
}
