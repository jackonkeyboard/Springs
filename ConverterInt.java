import java.util.Arrays;

public class ConverterInt extends Converter {
    public ConverterInt(int numBits) {
        super(numBits);
    }

    @Override
    public Spring[] convertToSprings(int[] bits) {
        Spring[] springs = new Spring[numBits];
        for (int i = 0; i < numBits; i++) {
            int bit = bits[i];
            double equilibriumPosition = bit == 1 ? 1.0 : -1.0;
            springs[i] = new Spring(equilibriumPosition);
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
        for (int i = 0; i < amplitudes.length; i++) {
            sum += amplitudes[i] * Math.pow(2, i);
        }
        return sum;
    }

    public static void main(String[] args) {
        ConverterInt converter = new ConverterInt(8);

        // Test case 1: 11001101 should be 205 in decimal
        int[] bits1 = { 1, 1, 0, 0, 1, 1, 0, 1 };
        double decimal1 = converter.evaluate(bits1);
        System.out.println("Test case 1: " + Arrays.toString(bits1) + " -> " + decimal1);

        // Test case 2: 1010 should be 10 in decimal
        int[] bits2 = { 1, 0, 1, 0 };
        double decimal2 = converter.evaluate(bits2);
        System.out.println("Test case 2: " + Arrays.toString(bits2) + " -> " + decimal2);

        // Test case 3: 111111 should be 63 in decimal
        int[] bits3 = { 1, 1, 1, 1, 1, 1 };
        double decimal3 = converter.evaluate(bits3);
        System.out.println("Test case 3: " + Arrays.toString(bits3) + " -> " + decimal3);
    }
}
