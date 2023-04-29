import java.util.Arrays;

public abstract class Converter {

    // Number of bits to use for binary representation
    protected int numBits;

    // Constructor
    public Converter(int numBits) {
        this.numBits = numBits;
    }

    // Abstract method to convert binary representation to spring system
    public abstract Spring[] convertToSprings(int[] binarySequence);

    // Concrete method to compute oscillations of a body of unit mass on the spring system
    public double[] computeOscillations(Spring[] springs, double t, double dt, double x0) {
        int numSteps = (int) (t / dt) + 1;
        double[] x = new double[numSteps];
        double[] v = new double[numSteps];
        x[0] = x0;
        for (int i = 1; i < numSteps; i++) {
            double force = 0;
            for (Spring spring : springs) {
                force += spring.getForce(x[i-1]);
            }
            v[i] = v[i-1] + dt * force;
            x[i] = x[i-1] + dt * v[i];
        }
        return x;
    }

    // Concrete method to compute frequency amplitudes using Fourier Transform
    public double[] computeAmplitudes(double[] x, double dt) {
        FT ft = new FT(x);
        double[] amplitudes = ft.getAmplitudes();
        double[] frequencies = new double[amplitudes.length];
        for (int i = 0; i < frequencies.length; i++) {
            frequencies[i] = i / (dt * x.length);
        }
        return amplitudes;
    }

    // Abstract method to evaluate decimal value of the original binary sequence
    public abstract double evaluate(int[] binarySequence);
}
