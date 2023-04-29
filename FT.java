import java.util.Arrays;

public class FT {
    private int N; // number of data points
    private double[] x; // data values
    
    public FT(double[] x) {
        N = x.length;
        this.x = Arrays.copyOf(x, N);
    }
    
    // compute the Fourier coefficients
    public Complex[] transform() {
        Complex[] c = new Complex[N/2 + 1];
        for (int k = 0; k <= N/2; k++) {
            c[k] = new Complex(0, 0);
            for (int n = 0; n < N; n++) {
                double real = x[n] * Math.cos(2 * Math.PI * k * n / N);
                double imag = -x[n] * Math.sin(2 * Math.PI * k * n / N);
                c[k] = c[k].plus(new Complex(real, imag));
            }
            if (k != 0 && k != N/2) {
                c[k] = c[k].times(new Complex(2, 0));
            }
            c[k] = c[k].divides(new Complex(N, 0));
        }
        return c;
    }
    
    // get the amplitudes of harmonic oscillations
    public double[] getAmplitudes() {
        Complex[] c = transform();
        double[] a = new double[c.length];
        for (int i = 0; i < c.length; i++) {
            a[i] = c[i].abs();
        }
        return a;
    }
}
