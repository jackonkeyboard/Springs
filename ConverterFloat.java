import java.util.Arrays;

public class ConverterFloat extends Converter {
    private static final int SPRINGS_PER_BIT = 8;

    private final int numIntBits;
    private final int numFracBits;

    public ConverterFloat(int numIntBits, int numFracBits) {
        super(numIntBits + numFracBits);
        this.numIntBits = numIntBits;
        this.numFracBits = numFracBits;
    }

    @Override
    public Spring[] convertToSprings(int[] bits) {
        Spring[] springs = new Spring[SPRINGS_PER_BIT * numBits];
        int intStartIndex = 0;
        int fracStartIndex = numIntBits * SPRINGS_PER_BIT;

        // Convert integer part to springs
        for (int i = 0; i < numIntBits; i++) {
            int bit = bits[i];
            int startIndex = intStartIndex + i * SPRINGS_PER_BIT;
            double equilibriumPosition = bit == 1 ? 1.0 : -1.0;
            for (int j = 0; j < SPRINGS_PER_BIT; j++) {
                springs[startIndex + j] = new Spring(equilibriumPosition);
            }
        }

        // Convert fractional part to springs
        for (int i = 0; i < numFracBits; i++) {
            int bit = bits[numIntBits + i];
            int startIndex = fracStartIndex + i * SPRINGS_PER_BIT;
            double equilibriumPosition = bit == 1 ? 1.0 : -1.0;
            for (int j = 0; j < SPRINGS_PER_BIT; j++) {
                springs[startIndex + j] = new Spring(equilibriumPosition);
            }
        }

        return springs;
    }

    @Override
    public double evaluate(int[] bits) {
        Spring[] springs = convertToSprings(bits);
        double[] sps = new double[springs.length];
        for (int i = 0; i < springs.length; i++) {
            sps[i] = springs[i].getK();
        }
        double[] amplitudes = new FT(sps).getAmplitudes();
        double sum = 0.0;
        for (int i = 1; i < amplitudes.length; i++) {
            sum += amplitudes[i] * i;
        }
        double freq = sum / (springs.length - 1);
        return freq;
    }

    public static void main(String[] args) {
        ConverterFloat converter = new ConverterFloat(8, 4);

        // Test case 1: integer part 11001101 and fractional part 0011 should be 205.1875 in decimal
        int[] bits1 = {1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1};
        double value1 = converter.evaluate(bits1);
        System.out.println("Test case 1: " + Arrays.toString(bits1) + " -> " + value1);
    }
}
