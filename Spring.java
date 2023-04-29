public class Spring {
    private double k = 1; // stiffness

    public double getK() {
        return k;
    }

    private void setK(double k) {
        this.k = k;
    }

    public Spring() {
    }

    public Spring(double stiffness) {
        k = stiffness;
    }

    public double[] move(double t, double dt, double x0, double v0) {
        return move(0, t, dt, x0, v0, 1.0);
    }

    public double[] move(double t, double dt, double x0) {
        return move(0, t, dt, x0, 0.0, 1.0);
    }

    public double[] move(double t0, double t1, double dt, double x0, double v0) {
        return move(t0, t1, dt, x0, v0, 1.0);
    }

    public double[] move(double t0, double t1, double dt, double x0, double v0, double m) {
        int n = (int) Math.ceil((t1 - t0) / dt);
        double[] coordinates = new double[n];

        for (int i = 0; i < n; i++) {
            double t = t0 + i * dt;
            double omega = Math.sqrt(k / m);
            coordinates[i] = x0 * Math.cos(omega * t) + (v0 / omega) * Math.sin(omega * t);
        }
        return coordinates;
    }

    public Spring inSeries(Spring that) {
        double equivalentStiffness = (this.k * that.k) / (this.k + that.k);
        return new Spring(equivalentStiffness);
    }

    public Spring inParallel(Spring that) {
        double equivalentStiffness = this.k + that.k;
        return new Spring(equivalentStiffness);
    }

    public static void main(String[] args) {
        Spring spring1 = new Spring(1.0);
        Spring spring2 = new Spring(2.0);
        Spring spring3 = spring1.inSeries(spring2);
        Spring spring4 = spring1.inParallel(spring2);

        double[] coordinates = spring1.move(0, 10, 0.01, 1.0, 0.0, 1.0);
        for (int i = 0; i < coordinates.length; i++) {
            System.out.println(coordinates[i]);
        }
    }

    public double getForce(double x) {
        return -k * x;
    }
}
