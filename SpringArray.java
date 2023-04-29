import java.util.Stack;

public class SpringArray {
    public static Spring equivalentSpring(String springExpr) {
        Spring[] unitSprings = new Spring[springExpr.length()];
        for (int i = 0; i < springExpr.length(); i++) {
            unitSprings[i] = new Spring();
        }
        return equivalentSpring(springExpr, unitSprings);
    }

    private static Spring equivalentSpring(String springExpr, Spring[] springs) {
        Stack<Spring> springStack = new Stack<>();
        int springIndex = 0;

        for (char c : springExpr.toCharArray()) {
            if (c == '{' || c == '[') {
                System.out.println(springIndex);
                springStack.push(springs[springIndex]);
                springIndex++;
            } else if (c == '}' || c == ']') {
                Spring spring = springStack.pop();
                if (!springStack.isEmpty()) {
                    Spring prevSpring = springStack.pop();
                    if (c == '}') {
                        springStack.push(prevSpring.inSeries(spring));
                    } else {
                        springStack.push(prevSpring.inParallel(spring));
                    }
                } else {
                    springStack.push(spring);
                }
            }
        }

        return springStack.pop();
    }

    public static void main(String[] args) {
        Spring[] springs = new Spring[3];
        springs[0] = new Spring(1);
        springs[1] = new Spring(2);
        springs[2] = new Spring(3);
        System.out.println(equivalentSpring("{[[]]}{[[]]}{[[]]}").getK());
    }
}
