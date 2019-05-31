import strings from "./strings";
import styles from "./styles";
import { strings as loginStrings } from "../../screens/Login";
import React, { Component } from "react";
import { View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import { NavigationScreenProp } from "react-navigation";
import { Formik, FormikProps, FormikActions } from "formik";
import { object as yupObject, string as yupString } from "yup";
import deviceStorage from '../../src/services/deviceStorage';

interface FormValues{

  email :string ;
  password : string ;

}
interface Props {
  navigation: NavigationScreenProp<any, any>
}

export default class LoginForm extends Component<Props, object> {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: ""
      };
  };

  handleConnection = (response, values, formikBag: FormikActions<FormValues>) =>{
    console.warn(response);
    if(response.length > 0 ){

      console.warn ("USER FOUND");
      this.setState({ email : values.email });
      this.setState({ password : values.password });
      setTimeout(() => {
        formikBag.setSubmitting(false);
        this.props.navigation.navigate("HomeScreen");
      }, 3000);

    }else{

      console.warn ("NO SUCH USER");
      formikBag.setSubmitting(false);
      Alert.alert(
        'Login problem',
        'There is no account registered with this email address',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },

        ],
        {cancelable: false},
      );

    }
  };

  handleSubmit = (values: FormValues, formikBag: FormikActions<FormValues>) =>
  {
    formikBag.setSubmitting(true);

    fetch('http://192.168.0.153:3000/dbRouter/login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,

        }),
      }
    )
    .then((response) => response.json())
    .then((responseJson) => this.handleConnection(responseJson, values, formikBag))
    .catch((error) => {
      console.error(error);
    });


  };
  renderForm = ({
    values,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    isSubmitting
  }: FormikProps<FormValues>) => (
    <View style={styles.container}>
      <Input
        placeholder={strings.emailAddress}
        keyboardType="email-address"
        autoCapitalize="none"
        value={values.email}
        onChangeText={value => setFieldValue("email", value)}
        onBlur={() => setFieldTouched("email")}
        editable={!isSubmitting}
        errorMessage={touched.email && errors.email ? errors.email : undefined}
      />
      <Input
        placeholder={strings.password}
        secureTextEntry
        autoCapitalize="none"
        value={values.password}
        onChangeText={value => setFieldValue("password", value)}
        onBlur={() => setFieldTouched("password")}
        editable={!isSubmitting}
        errorMessage={touched.password && errors.password ? errors.password : undefined}
      />
      <View style={styles.buttonContainer}>
      <Button
        clear
        title={loginStrings.forgottenPassword}
        containerStyle={styles.forgottenPasswordButtonContainer}
        titleStyle={styles.forgottenPasswordTitle}
        onPress={() => this.props.navigation.navigate("PasswordResetScreen")}
      />
      <Button
        title={loginStrings.loginTitle}
        containerStyle={styles.loginButtonContainer}
        buttonStyle={styles.loginButton}
        disabledStyle={styles.disabled}
        titleStyle={styles.loginButtonTitle}
        disabledTitleStyle={styles.loginButtonTitle}
        onPress={handleSubmit}
        disabled={isSubmitting}
        loading={isSubmitting}
        loadingProps={{ size: "small", color: "white" }}
      />
      </View>

    </View>
  );

  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values: FormValues, formikBag: FormikActions<FormValues>) =>
          this.handleSubmit(values, formikBag)
        }
        validationSchema={yupObject().shape({
          email: yupString()
            .email(strings.invalidEmailFormat)
            .required(strings.emailRequired),
          password: yupString()
            .min(8, strings.passwordMinLength)
            .required(strings.passwordRequired)
        })}
        render={(formikBag: FormikProps<FormValues>) => this.renderForm(formikBag)}
      />
    );
  }
}
