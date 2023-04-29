import java.util.Arrays;

public class Converter8Bit extends Converter {
    private static final int SPRINGS_PER_BIT = 8;

    public Converter8Bit() {
        super(8);
    }

    @Override
    public Spring[] convertToSprings(int[] bits) {
        Spring[] springs = new Spring[SPRINGS_PER_BIT * numBits];
        for (int i = 0; i < numBits; i++) {
            int bit = bits[i];
            int startIndex = i * SPRINGS_PER_BIT;
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
        Converter8Bit converter = new Converter8Bit();

        // Test case 1: 11001101 should be 205 in decimal
        int[] bits1 = {1, 1, 0, 0, 1, 1, 0, 1};
        double freq1 = converter.evaluate(bits1);
        System.out.println("Test case 1: " + Arrays.toString(bits1) + " -> " + freq1);

        // Test case 2: 01010101 should be 85 in decimal
        int[] bits2 = {0, 1, 0, 1, 0, 1, 0, 1};
        double freq2 = converter.evaluate(bits2);
        System.out.println("Test case 2: " + Arrays.toString(bits2) + " -> " + freq2);

        // Test case 3: 11111111 should be 255 in decimal
        int[] bits3 = {1, 1, 1, 1, 1, 1, 1, 1};
        double freq3 = converter.evaluate(bits3);
        System.out.println("Test case 3: " + Arrays.toString(bits3) + " -> " + freq3);
    }
}
