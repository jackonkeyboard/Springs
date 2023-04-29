public class Complex {
    private final double real;
    private final double imag;

    public Complex(double real, double imag) {
        this.real = real;
        this.imag = imag;
    }

    public double real() {
        return real;
    }

    public double imag() {
        return imag;
    }

    public Complex plus(Complex b) {
        double real = this.real + b.real;
        double imag = this.imag + b.imag;
        return new Complex(real, imag);
    }

    public Complex minus(Complex b) {
        double real = this.real - b.real;
        double imag = this.imag - b.imag;
        return new Complex(real, imag);
    }

    public Complex times(Complex b) {
        double real = this.real * b.real - this.imag * b.imag;
        double imag = this.real * b.imag + this.imag * b.real;
        return new Complex(real, imag);
    }

    public Complex divides(Complex b) {
        double denom = b.real * b.real + b.imag * b.imag;
        double real = (this.real * b.real + this.imag * b.imag) / denom;
        double imag = (this.imag * b.real - this.real * b.imag) / denom;
        return new Complex(real, imag);
    }

    public double abs() {
        return Math.sqrt(real * real + imag * imag);
    }

    public Complex conjugate() {
        return new Complex(real, -imag);
    }

    public String toString() {
        if (imag == 0) return String.format("%.1f", real);
        if (real == 0) return String.format("%.1fi", imag);
        if (imag <  0) return String.format("%.1f - %.1fi", real, -imag);
        return String.format("%.1f + %.1fi", real, imag);
    }
}
